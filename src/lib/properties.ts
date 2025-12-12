import { fetchProperties, fetchPropertyById as fetchPropertyByIdApi, ApiProperty, ApiFilterOptions } from './api';

// Property interface - matches current structure
export interface Property {
  id?: string | number;
  title: string;
  description: string;
  type: string;
  price: number;
  bedrooms: number | string;
  bathrooms: number;
  area: number;
  location: string;
  developer?: string;
  amenities: string[];
  mainImage: string;
  gallery: string[];
  createdAt?: string;
  updatedAt?: string;
  readyDate?: string;
  listingType?: 'sale' | 'rent';
}

// Map API property to our Property interface
function mapApiPropertyToProperty(apiProperty: ApiProperty): Property {
  // Log the raw API property for debugging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Mapping API property:', JSON.stringify(apiProperty, null, 2));
  }

  // ID - can be string or number
  const id = apiProperty.id || apiProperty._id || undefined;

  // Title - check multiple possible fields
  const title = apiProperty.title || 
                apiProperty.name || 
                apiProperty.property_name ||
                'Untitled Property';

  // Description - check multiple possible fields
  const description = apiProperty.description || 
                      apiProperty.details || 
                      apiProperty.overview ||
                      apiProperty.summary ||
                      '';

  // Type - check multiple possible fields
  const type = apiProperty.type || 
               apiProperty.property_type || 
               apiProperty.category ||
               'Property';

  // Price - use min_price if available, otherwise max_price, otherwise check price field
  const price = apiProperty.min_price ?? 
                apiProperty.max_price ?? 
                apiProperty.price ?? 
                (apiProperty.price_range?.min ?? apiProperty.price_range?.max) ??
                0;

  // Area - prefer sq_ft, then area, then property_size
  const area = apiProperty.sq_ft ?? 
               apiProperty.area ?? 
               apiProperty.property_size ??
               apiProperty.size ??
               (apiProperty.sq_ft_range?.min ?? apiProperty.sq_ft_range?.max) ??
               0;

  // Bedrooms - handle string, number, or array
  let bedrooms: number | string = 0;
  if (apiProperty.bedrooms !== undefined && apiProperty.bedrooms !== null) {
    if (typeof apiProperty.bedrooms === 'string') {
      const parsed = parseInt(apiProperty.bedrooms);
      bedrooms = isNaN(parsed) ? apiProperty.bedrooms : parsed;
    } else if (Array.isArray(apiProperty.bedrooms)) {
      bedrooms = apiProperty.bedrooms[0] || 0;
    } else {
      bedrooms = apiProperty.bedrooms;
    }
  } else if (apiProperty.min_bedrooms) {
    const minBedrooms = Array.isArray(apiProperty.min_bedrooms) 
      ? apiProperty.min_bedrooms[0] 
      : apiProperty.min_bedrooms;
    bedrooms = typeof minBedrooms === 'string' ? parseInt(minBedrooms) || minBedrooms : minBedrooms || 0;
  }

  // Bathrooms - handle string or number
  let bathrooms: number = 0;
  if (apiProperty.bathrooms !== undefined && apiProperty.bathrooms !== null) {
    if (typeof apiProperty.bathrooms === 'string') {
      const parsed = parseInt(apiProperty.bathrooms);
      bathrooms = isNaN(parsed) ? 0 : parsed;
    } else if (Array.isArray(apiProperty.bathrooms)) {
      bathrooms = parseInt(apiProperty.bathrooms[0] as string) || 0;
    } else {
      bathrooms = apiProperty.bathrooms;
    }
  } else if (apiProperty.min_bathrooms) {
    const minBathrooms = Array.isArray(apiProperty.min_bathrooms) 
      ? apiProperty.min_bathrooms[0] 
      : apiProperty.min_bathrooms;
    bathrooms = typeof minBathrooms === 'string' ? parseInt(minBathrooms) || 0 : minBathrooms || 0;
  }

  // Location - combine multiple fields
  let location = apiProperty.location || '';
  if (!location) {
    const parts: string[] = [];
    if (apiProperty.locality) parts.push(apiProperty.locality);
    if (apiProperty.city) parts.push(apiProperty.city);
    if (apiProperty.address) parts.push(apiProperty.address);
    if (apiProperty.area_name) parts.push(apiProperty.area_name);
    location = parts.join(', ');
  }
  if (!location) {
    location = 'Location not specified';
  }

  // Developer - handle object or string
  let developer: string = '';
  if (apiProperty.developer) {
    if (typeof apiProperty.developer === 'string') {
      developer = apiProperty.developer;
    } else if (apiProperty.developer.name) {
      developer = apiProperty.developer.name;
    } else if (apiProperty.developer_id) {
      // If developer is just an ID, we might need to fetch it separately
      developer = '';
    }
  }
  // Also check developer_name field
  if (!developer && (apiProperty as any).developer_name) {
    developer = (apiProperty as any).developer_name;
  }

  // Images - check multiple possible fields
  let mainImage: string | null = null;
  let gallery: string[] = [];

  // Check for main_image field
  if (apiProperty.main_image && apiProperty.main_image.trim() !== '') {
    mainImage = apiProperty.main_image;
  }

  // Check for images array
  if (apiProperty.images && Array.isArray(apiProperty.images) && apiProperty.images.length > 0) {
    // Filter out empty strings
    const validImages = apiProperty.images.filter((img: any) => img && typeof img === 'string' && img.trim() !== '');
    
    if (validImages.length > 0) {
      // Use first image as main if no main_image
      if (!mainImage) {
        mainImage = validImages[0];
      }
      // Rest as gallery (excluding main image)
      gallery = validImages.filter((img: string) => img !== mainImage);
    }
  }

  // Check for gallery array
  if (apiProperty.gallery && Array.isArray(apiProperty.gallery) && apiProperty.gallery.length > 0) {
    const validGallery = apiProperty.gallery.filter((img: any) => img && typeof img === 'string' && img.trim() !== '');
    if (validGallery.length > 0) {
      gallery = [...gallery, ...validGallery.filter((img: string) => img !== mainImage)];
    }
  }

  // Check for image_urls or photo_urls
  if (!mainImage && (apiProperty as any).image_urls && Array.isArray((apiProperty as any).image_urls)) {
    const imageUrls = (apiProperty as any).image_urls.filter((img: any) => img && typeof img === 'string' && img.trim() !== '');
    if (imageUrls.length > 0) {
      mainImage = imageUrls[0];
      gallery = imageUrls.slice(1);
    }
  }

  // Use placeholder if no image is available
  const finalMainImage = mainImage && mainImage.trim() !== '' 
    ? mainImage 
    : 'https://via.placeholder.com/800x600?text=No+Image';

  // Amenities - ensure it's an array
  let amenities: string[] = [];
  if (apiProperty.amenities) {
    if (Array.isArray(apiProperty.amenities)) {
      amenities = apiProperty.amenities.filter((a: any) => a && (typeof a === 'string' || typeof a === 'object'));
      // If amenities are objects, extract names
      amenities = amenities.map((a: any) => typeof a === 'string' ? a : (a.name || a.title || String(a)));
    } else if (typeof apiProperty.amenities === 'string') {
      // Try to parse if it's a JSON string
      try {
        const parsed = JSON.parse(apiProperty.amenities);
        amenities = Array.isArray(parsed) ? parsed : [];
      } catch {
        amenities = [apiProperty.amenities];
      }
    }
  }

  // Dates
  const createdAt = apiProperty.created_at || apiProperty.createdAt || apiProperty.created || undefined;
  const updatedAt = apiProperty.updated_at || apiProperty.updatedAt || apiProperty.updated || undefined;
  
  // Ready date / Handover year
  let readyDate: string | undefined = undefined;
  if (apiProperty.ready_date) {
    readyDate = apiProperty.ready_date;
  } else if (apiProperty.handover_year) {
    readyDate = apiProperty.handover_year.toString();
  } else if (apiProperty.handover_date) {
    readyDate = apiProperty.handover_date;
  } else if (apiProperty.completion_date) {
    readyDate = apiProperty.completion_date;
  }

  // Listing type
  const listingType = apiProperty.listing_type || 
                      apiProperty.listingType || 
                      (apiProperty.category === 'rent' ? 'rent' : 'sale') ||
                      'sale';

  return {
    id,
    title,
    description,
    type,
    price,
    bedrooms,
    bathrooms,
    area,
    location,
    developer: developer || undefined,
    amenities,
    mainImage: finalMainImage,
    gallery,
    createdAt,
    updatedAt,
    readyDate,
    listingType: listingType as 'sale' | 'rent',
  };
}

export interface FilterOptions {
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  listingType?: 'sale' | 'rent';
  city?: string;
  search?: string;
}

// Convert FilterOptions to API format
function convertFiltersToApi(filters: FilterOptions): ApiFilterOptions {
  const apiFilters: ApiFilterOptions = {};
  
  if (filters.type) {
    apiFilters.type = filters.type;
  }
  
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    if (filters.minPrice !== undefined) apiFilters.min_price = filters.minPrice;
    if (filters.maxPrice !== undefined) apiFilters.max_price = filters.maxPrice;
  }
  
  if (filters.bedrooms !== undefined) {
    apiFilters.min_bedrooms = [filters.bedrooms.toString()];
  }
  
  if (filters.bathrooms !== undefined) {
    apiFilters.min_bathrooms = [filters.bathrooms.toString()];
  }
  
  if (filters.city) {
    apiFilters.city = filters.city;
  }
  
  if (filters.search) {
    apiFilters.search = filters.search;
  }
  
  // Note: listingType might need to be mapped differently based on API
  
  return apiFilters;
}

// Fetch all properties from API
export async function getAllProperties(filters: FilterOptions = {}, page: number = 1, limit: number = 100): Promise<Property[]> {
  try {
    const apiFilters = convertFiltersToApi(filters);
    const response = await fetchProperties(apiFilters, page, limit);
    
    if (response.success && response.data) {
      return response.data.map(mapApiPropertyToProperty);
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

// Fetch property by ID from API
export async function getPropertyById(id: string | number): Promise<Property | null> {
  try {
    const idStr = typeof id === 'number' ? id.toString() : id;
    const apiProperty = await fetchPropertyByIdApi(idStr);
    
    if (apiProperty) {
      return mapApiPropertyToProperty(apiProperty);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching property by ID:', error);
    return null;
  }
}

// Fetch related properties
export async function getRelatedProperties(
  excludeId: string | number,
  type?: string,
  limit: number = 4
): Promise<Property[]> {
  try {
    const filters: FilterOptions = {};
    if (type) {
      filters.type = type;
    }
    
    const properties = await getAllProperties(filters, 1, limit + 10);
    const excludeIdStr = typeof excludeId === 'number' ? excludeId.toString() : excludeId;
    
    const filtered = properties
      .filter((p) => {
        const pId = typeof p.id === 'number' ? p.id.toString() : p.id;
        return pId !== excludeIdStr;
      })
      .slice(0, limit);
    
    return filtered;
  } catch (error) {
    console.error('Error fetching related properties:', error);
    return [];
  }
}

// Format price for display
export function formatPrice(price: number): string {
  if (price >= 1000000000) {
    const bValue = (price / 1000000000).toFixed(2);
    return `${parseFloat(bValue).toLocaleString('en-US')}B`;
  } else if (price >= 1000000) {
    const mValue = (price / 1000000).toFixed(2);
    return `${parseFloat(mValue).toLocaleString('en-US')}M`;
  } else if (price >= 1000) {
    const kValue = (price / 1000).toFixed(0);
    return `${parseInt(kValue).toLocaleString('en-US')}K`;
  }
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Filter properties (client-side filtering for additional filtering if needed)
export function filterProperties(properties: Property[], filters: FilterOptions): Property[] {
  return properties.filter((property) => {
    if (filters.type && property.type !== filters.type) return false;
    if (filters.bedrooms && property.bedrooms !== filters.bedrooms) return false;
    if (filters.bathrooms && property.bathrooms !== filters.bathrooms) return false;
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.listingType && property.listingType !== filters.listingType) return false;
    return true;
  });
}

// Fetch properties with pagination
export interface PaginatedPropertiesResult {
  properties: Property[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getPaginatedProperties(
  filters: FilterOptions = {},
  page: number = 1,
  limit: number = 20
): Promise<PaginatedPropertiesResult> {
  try {
    const apiFilters = convertFiltersToApi(filters);
    const response = await fetchProperties(apiFilters, page, limit);
    
    if (response.success && response.data && response.pagination) {
      return {
        properties: response.data.map(mapApiPropertyToProperty),
        pagination: {
          page: response.pagination.page,
          limit: response.pagination.limit,
          total: response.pagination.total,
          totalPages: response.pagination.total_pages,
        },
      };
    }
    
    return {
      properties: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    };
  } catch (error) {
    console.error('Error fetching paginated properties:', error);
    return {
      properties: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
    };
  }
}
