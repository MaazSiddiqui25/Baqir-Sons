// schemas/homePage.ts
const homePageSchema = {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    
    // Hero Section - matches your component structure
    {
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'Leading Manufacturing Excellence'
        },
        {
          name: 'heading',
          title: 'Main Heading',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3
        },
        {
          name: 'ctaButtons',
          title: 'CTA Buttons',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'text',
                  title: 'Button Text',
                  type: 'string'
                },
                {
                  name: 'link',
                  title: 'Button Link',
                  type: 'string'
                },
                {
                  name: 'isPrimary',
                  title: 'Is Primary Button',
                  type: 'boolean',
                  initialValue: false
                }
              ]
            }
          ],
          validation: Rule => Rule.max(2)
        }
      ]
    },

    // Banner Slider Section
    {
      name: 'bannerSlider',
      title: 'Banner Slider',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Slider Images',
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
                  type: 'string'
                },
                {
                  name: 'title',
                  title: 'Image Title',
                  type: 'string'
                }
              ]
            }
          ]
        },
        {
          name: 'autoSlideInterval',
          title: 'Auto Slide Interval (seconds)',
          type: 'number',
          initialValue: 3
        }
      ]
    },

    // Stats Section
    {
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Statistic Number',
              type: 'string', // String to allow formats like "25+" or "1000+"
              validation: Rule => Rule.required()
            },
            {
              name: 'label',
              title: 'Statistic Label',
              type: 'string',
              validation: Rule => Rule.required()
            }
          ]
        }
      ],
      validation: Rule => Rule.max(4)
    },

    // About Section - matches your component
    {
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'About Us'
        },
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Rich Text Description',
          type: 'array',
          of: [
            {
              type: 'block',
              styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'Quote', value: 'blockquote' }
              ],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                  { title: 'Code', value: 'code' }
                ]
              }
            }
          ]
        },
        {
          name: 'factoryImage',
          title: 'Factory Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'icon',
                  title: 'Icon (Emoji or text)',
                  type: 'string',
                  validation: Rule => Rule.max(5)
                },
                {
                  name: 'title',
                  title: 'Feature Title',
                  type: 'string'
                },
                {
                  name: 'color',
                  title: 'Color Theme',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Emerald', value: 'emerald' },
                      { title: 'Green', value: 'green' }
                    ]
                  },
                  initialValue: 'emerald'
                }
              ]
            }
          ],
          validation: Rule => Rule.max(4)
        }
      ]
    },

    // Products Section
    {
      name: 'productsSection',
      title: 'Products Section',
      type: 'object',
      fields: [
        {
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Our Products'
        },
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string'
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text'
        },
        {
          name: 'featuredProducts',
          title: 'Featured Products',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'title',
                  title: 'Product Title',
                  type: 'string'
                },
                {
                  name: 'description',
                  title: 'Product Description',
                  type: 'text'
                },
                {
                  name: 'image',
                  title: 'Product Image',
                  type: 'image',
                  options: {
                    hotspot: true
                  }
                },
                {
                  name: 'accent',
                  title: 'Accent Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Emerald', value: 'emerald' },
                      { title: 'Green', value: 'green' }
                    ]
                  },
                  initialValue: 'emerald'
                }
              ]
            }
          ],
          validation: Rule => Rule.max(3)
        }
      ]
    },

    // SEO Settings
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
      heroHeading: 'heroSection.heading'
    },
    prepare(selection) {
      const { title, heroHeading } = selection;
      return {
        title: title || heroHeading || 'Home Page',
        subtitle: 'Homepage content'
      };
    }
  }
}
export default homePageSchema;