// schemas/product.js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 96)
      },
      validation: Rule => Rule.required()
    },
    {
  name: 'description',
  title: 'Product Description',
  type: 'text',
  rows: 4,
  validation: Rule => Rule.required()
},
{
  name: 'descriptionUrdu',
  title: 'Product Description (Urdu)',
  type: 'text',
  rows: 4
},
{
  name: 'detailedDescription',
  title: 'Detailed Description',
  type: 'text',
  rows: 8,
  description: 'Comprehensive product description for the detail page'
},
{
  name: 'detailedDescriptionUrdu',
  title: 'Detailed Description (Urdu)',
  type: 'text',
  rows: 8,
  description: 'Comprehensive product description in Urdu'
},
{
  name: 'titleUrdu',
  title: 'Product Title (Urdu)',
  type: 'string'
},

   
    {
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      validation: Rule => Rule.positive()
    },
    
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true
              }
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string'
            }
          ]
        }
      ],
      validation: Rule => Rule.min(1).error('At least one image is required')
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Premium Series', value: 'Premium Series' },
          { title: 'Professional Series', value: 'Professional Series' },
          { title: 'Innovation Series', value: 'Innovation Series' },
          { title: 'Industrial Equipment', value: 'Industrial Equipment' },
          { title: 'Custom Solutions', value: 'Custom Solutions' }
        ]
      },
      
    },
    
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'specifications',
      title: 'Technical Specifications',
      type: 'object',
      fields: [
        
        {
          name: 'customSpecs',
          title: 'Additional Specifications',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Specification Label',
                  type: 'string'
                },
                {
                  name: 'value',
                  title: 'Specification Value',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    },
    {
  name: 'features',
  title: 'Key Features',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Feature Text',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'textUrdu',
          title: 'Feature Text (Urdu)',
          type: 'string'
        }
      ]
    }
  ]
    },
    {
      name: 'applications',
      title: 'Applications & Use Cases',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'relatedProducts',
      title: 'Related Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ],
      validation: Rule => Rule.max(6)
    },
    {
      name: 'downloadableFiles',
      title: 'Downloadable Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'File Title',
              type: 'string'
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              options: {
                accept: '.pdf,.doc,.docx,.zip'
              }
            },
            {
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Brochure', value: 'brochure' },
                  { title: 'Manual', value: 'manual' },
                  { title: 'Specification Sheet', value: 'specification' },
                  { title: 'CAD Files', value: 'cad' },
                  { title: 'Installation Guide', value: 'installation' },
                  { title: 'Other', value: 'other' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'videoUrl',
      title: 'Product Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video URL'
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true
      },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags'
          }
        },
        {
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      category: 'category',
      price: 'price',
      media: 'images.0.image',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, category, price, media, featured } = selection;
      const subtitle = [
        category,
        price ? `$${price.toLocaleString()}` : 'Price TBD',
        featured ? '⭐ Featured' : ''
      ].filter(Boolean).join(' • ');
      
      return {
        title,
        subtitle,
        media
      };
    }
  },

  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    },
    {
      title: 'Title Z-A', 
      name: 'titleDesc',
      by: [{ field: 'title', direction: 'desc' }]
    },
    {
      title: 'Price Low-High',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }]
    },
    {
      title: 'Price High-Low',
      name: 'priceDesc',
      by: [{ field: 'price', direction: 'desc' }]
    },
    {
      title: 'Featured First',
      name: 'featured',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' }
      ]
    },
    {
      title: 'Newest First',
      name: 'newest',
      by: [{ field: '_createdAt', direction: 'desc' }]
    }
  ]
}