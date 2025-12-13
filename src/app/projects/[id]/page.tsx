'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from '../../../components/property/property-card';
import InquiryModal from '../../../components/property/inquiry-modal';
import DescriptionModal from '../../../components/property/description-modal';
import ImageViewerModal from '../../../components/property/image-viewer-modal';
import AmenitiesModal from '../../../components/property/amenities-modal';
import FAQ from '../../../components/home/FAQ';
import { getPropertyById, getRelatedProperties, formatPrice, Property } from '../../../lib/properties';

export default function PropertyDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const loadProperty = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const propertyData = await getPropertyById(id);
          if (propertyData) {
            setProperty(propertyData);
            const related = await getRelatedProperties(id, propertyData.type, 3);
            setRelatedProperties(related);
          }
        } catch (error) {
          console.error('Error loading property:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-black text-lg md:text-xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-black text-lg md:text-xl font-semibold mb-4">Property not found</div>
          <Link href="/projects" className="text-[#1f2462] hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Filter out empty images and ensure we have at least one image
  const allImages = [
    property.mainImage,
    ...property.gallery.filter((img: string) => img && img.trim() !== '' && img !== property.mainImage)
  ].filter((img: string) => img && img.trim() !== '');
  
  // Use placeholder if no images available
  const images = allImages.length > 0 
    ? allImages 
    : ['https://via.placeholder.com/800x600?text=No+Image'];
  
  const descriptionPreview = property.description.length > 200 ? property.description.substring(0, 200) : property.description;
  const hasMoreDescription = property.description.length > 200;

  return (
    <>
      <main className="bg-neutral-50 min-h-screen pt-[120px] pb-0">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-[100px]">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-[30px] mb-6 md:mb-8 lg:mb-[30px]">
            {/* Left: Image Gallery */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-[19px]">
                {/* Main Image Container */}
                <div className="w-full sm:w-auto flex-shrink-0">
                  {images[selectedImage] && images[selectedImage].trim() !== '' ? (
                    <div 
                      className="relative w-full sm:w-[400px] lg:w-[569px] aspect-[4/3] sm:aspect-auto sm:h-[300px] md:h-[350px] lg:h-[443px] rounded-[10px] overflow-hidden cursor-pointer bg-gray-100"
                      onClick={() => setIsImageViewerOpen(true)}
                    >
                      <Image
                        src={images[selectedImage]}
                        alt={property.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 569px"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="relative w-full sm:w-[400px] lg:w-[569px] aspect-[4/3] sm:aspect-auto sm:h-[300px] md:h-[350px] lg:h-[443px] rounded-[10px] overflow-hidden bg-gray-200 flex items-center justify-center">
                      <svg className="w-20 h-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Thumbnails Container */}
                {images.length > 0 && (
                  <div className="flex-shrink-0">
                    {/* Mobile: Horizontal Scrollable Thumbnails */}
                    <div className="sm:hidden w-full">
                      <div className="flex flex-row gap-2 overflow-x-auto scrollbar-hide py-2 pb-2 -mx-4 px-6">
                        {images.slice(0, 5).map((image, idx) => {
                          if (!image || image.trim() === '') return null;
                          
                          const isSelected = selectedImage === idx;
                          const isLastWithMore = idx === 4 && images.length > 5 && !isSelected;
                          
                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                if (isLastWithMore) {
                                  setIsImageViewerOpen(true);
                                } else {
                                  setSelectedImage(idx);
                                }
                              }}
                              className={`relative w-[70px] h-[52px] rounded-[10px] overflow-hidden cursor-pointer transition-all flex-shrink-0 bg-gray-100 p-[2px] ${
                                isSelected ? 'ring-2 ring-[#1f2462]' : 'opacity-70 hover:opacity-100'
                              }`}
                            >
                              <div className="relative w-full h-full rounded-[8px] overflow-hidden">
                                <Image
                                  src={image}
                                  alt={`Thumbnail ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="70px"
                                />
                                {isLastWithMore && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="text-white text-xs font-semibold">
                                      +{images.length - 5}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tablet & Desktop: Vertical Thumbnails */}
                    <div className="hidden sm:flex flex-col gap-3 md:gap-[15px] py-2">
                      {images.slice(0, 5).map((image, idx) => {
                        if (!image || image.trim() === '') return null;
                        
                        const isSelected = selectedImage === idx;
                        const isLastWithMore = idx === 4 && images.length > 5 && !isSelected;
                        
                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              if (isLastWithMore) {
                                setIsImageViewerOpen(true);
                              } else {
                                setSelectedImage(idx);
                              }
                            }}
                            className={`relative w-[90px] md:w-[102px] h-[68px] md:h-[75.6px] rounded-[10px] overflow-visible cursor-pointer transition-all flex-shrink-0 bg-gray-100 p-[2px] ${
                              isSelected ? 'ring-2 ring-[#1f2462]' : 'opacity-70 hover:opacity-100'
                            }`}
                          >
                            <div className="relative w-full h-full rounded-[8px] overflow-hidden">
                              <Image
                                src={image}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="102px"
                              />
                              {isLastWithMore && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                  <span className="text-white text-sm font-semibold">
                                    +{images.length - 5}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Property Info - Match image height */}
            <div className="flex-1 max-w-full lg:max-w-[530px] lg:h-[443px] flex flex-col">
              <div className="flex flex-col gap-3 md:gap-4 lg:gap-4">
                {/* Title and Location */}
                <div>
                  <h1 className="font-semibold text-xl md:text-2xl lg:text-[26px] leading-[1.3] text-black mb-2">
                    {property.title}
                  </h1>
                  <p className="text-sm md:text-base leading-normal text-[#61656e]">
                    {property.location}
                  </p>
                </div>

                {/* Description with Read More */}
                <div className="flex-1 min-h-0 flex flex-col">
                  <p className="text-sm md:text-base leading-[1.6] text-[#12161D] mb-1">
                    {descriptionPreview}
                    {hasMoreDescription && (
                      <>
                        ...{' '}
                        <button
                          onClick={() => setIsDescriptionModalOpen(true)}
                          className="text-[#1f2462] hover:underline font-medium"
                        >
                          Read more
                        </button>
                      </>
                    )}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {property.bedrooms && property.bedrooms > 0 && (
                    <div className="bg-[#e5e7ff] flex gap-1.5 items-center px-2.5 md:px-3 py-1.5 md:py-2 rounded-[28px]">
                      <div className="w-4.5 h-4.5 md:w-5 md:h-5 flex items-center justify-center shrink-0">
                        <svg width="16" height="12" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="7.078" width="18" height="12" rx="2" stroke="black" strokeWidth="2"/>
                          <path d="M7 7.078V5.078C7 3.97343 7.89543 3.078 9 3.078H13C14.1046 3.078 15 3.97343 15 5.078V7.078" stroke="black" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span className="font-medium text-xs md:text-sm leading-normal text-black whitespace-nowrap">
                        {property.bedrooms}-bedroom
                      </span>
                    </div>
                  )}

                  {property.bathrooms !== undefined && property.bathrooms !== null && property.bathrooms > 0 && (
                    <div className="bg-[#e5e7ff] flex gap-1.5 items-center px-2.5 md:px-3 py-1.5 md:py-2 rounded-[28px]">
                      <div className="w-4.5 h-4.5 md:w-5 md:h-5 flex items-center justify-center shrink-0">
                        <svg width="15" height="15" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="3.078" width="16" height="16" rx="2" stroke="black" strokeWidth="2"/>
                          <circle cx="10.5" cy="9.078" r="2" stroke="black" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span className="font-medium text-xs md:text-sm leading-normal text-black whitespace-nowrap">
                        {property.bathrooms}-bathroom
                      </span>
                    </div>
                  )}

                  {property.type && typeof property.type === 'string' && property.type.trim() !== '' && (
                    <div className="bg-[#e5e7ff] flex gap-1.5 items-center px-2.5 md:px-3 py-1.5 md:py-2 rounded-[28px]">
                      <div className="w-4.5 h-4.5 md:w-5 md:h-5 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="black" strokeWidth="2"/>
                        </svg>
                      </div>
                      <span className="font-medium text-xs md:text-sm leading-normal text-black whitespace-nowrap">
                        {property.type}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-auto pt-4">
                {/* Price */}
                <p className="font-semibold text-2xl md:text-3xl lg:text-[32px] leading-normal text-black">
                  AED {formatPrice(property.price)}
                </p>

                {/* Enquire Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#1f2462] text-white text-base md:text-lg font-medium px-4 md:px-6 py-3 md:py-4 rounded-[4px] hover:bg-[#1a1f5a] transition-colors"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          </div>

          {/* Property Details Grid */}
          <div className="bg-white border border-[#dddddd] rounded-[8px] p-4 md:p-5 lg:p-6 mb-6 md:mb-8 lg:mb-[30px]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
              {/* Developer Name - only show if exists and not empty */}
              {property.developer && typeof property.developer === 'string' && property.developer.trim() !== '' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Developer Name</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.developer}</span>
                </div>
              )}
              
              {/* Area - only show if exists and greater than 0 */}
              {property.area !== undefined && property.area !== null && property.area > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Area</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.area} sq. ft</span>
                </div>
              )}
              
              {/* Amenities - only show if exists and has items */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Amenities</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">
                      {property.amenities.slice(0, 2).join(', ')}
                    </span>
                    {property.amenities.length > 2 && (
                      <button
                        onClick={() => setIsAmenitiesModalOpen(true)}
                        className="text-[#1f2462] text-xs md:text-sm hover:underline text-left"
                      >
                        +{property.amenities.length - 2} more
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* Bathrooms - only show if exists and greater than 0 */}
              {property.bathrooms !== undefined && property.bathrooms !== null && property.bathrooms > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Bathrooms</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.bathrooms}</span>
                </div>
              )}
              
              {/* Delivery Date - only show if exists and not empty */}
              {property.readyDate && typeof property.readyDate === 'string' && property.readyDate.trim() !== '' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Delivery Date</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.readyDate}</span>
                </div>
              )}
              
              {/* Floors - only show if exists and greater than 0 */}
              {property.floors !== undefined && property.floors !== null && 
               ((typeof property.floors === 'number' && property.floors > 0) || 
                (typeof property.floors === 'string' && property.floors !== '0' && property.floors.trim() !== '' && property.floors.trim() !== 'null' && property.floors.trim() !== 'undefined')) && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Floors</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.floors}</span>
                </div>
              )}
              
              {/* Security - only show if exists */}
              {property.security !== undefined && property.security !== null && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Security</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">
                    {typeof property.security === 'boolean' 
                      ? (property.security ? 'Yes' : 'No')
                      : (typeof property.security === 'string' 
                          ? (property.security.toLowerCase() === 'true' || property.security.toLowerCase() === 'yes' || property.security === '1' ? 'Yes' : property.security)
                          : 'Yes')}
                  </span>
                </div>
              )}
              
              {/* Furnished - only show if exists and not empty */}
              {property.furnished && typeof property.furnished === 'string' && property.furnished.trim() !== '' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Furnished</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.furnished}</span>
                </div>
              )}
              
              {/* Payment Plan - only show if exists and not empty */}
              {property.paymentPlan && typeof property.paymentPlan === 'string' && property.paymentPlan.trim() !== '' && (
                <div className="flex flex-col gap-1">
                  <span className="text-[#61656e] text-xs md:text-sm lg:text-[16px] font-medium leading-[20px] md:leading-[27px]">Payment Plan</span>
                  <span className="text-black text-sm md:text-base lg:text-[18px] font-medium leading-[20px] md:leading-[27px]">{property.paymentPlan}</span>
                </div>
              )}
            </div>
          </div>

          {/* Related Properties */}
          {relatedProperties.length > 0 && (
            <div className="mb-6 md:mb-8 lg:mb-[30px]">
              <h2 className="font-medium text-xl md:text-2xl lg:text-[32px] leading-normal text-black mb-4 md:mb-6 lg:mb-[30px]">
                Other Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-[30px]">
                {relatedProperties.map((relatedProperty) => (
                  <PropertyCard key={relatedProperty.id} property={relatedProperty} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Modals */}
        <InquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyId={property.id?.toString() || ''}
          propertyTitle={property.title}
        />

        <DescriptionModal
          isOpen={isDescriptionModalOpen}
          onClose={() => setIsDescriptionModalOpen(false)}
          title={property.title}
          description={property.description}
        />

        <ImageViewerModal
          isOpen={isImageViewerOpen}
          onClose={() => setIsImageViewerOpen(false)}
          images={images}
          initialIndex={selectedImage}
          propertyTitle={property.title}
        />

        <AmenitiesModal
          isOpen={isAmenitiesModalOpen}
          onClose={() => setIsAmenitiesModalOpen(false)}
          amenities={property.amenities || []}
          propertyTitle={property.title}
        />
      </main>
    </>
  );
}
