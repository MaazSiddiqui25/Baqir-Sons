// lib/queries.ts
export const homePageQuery = `*[_type == "homePage"][0]{
  title,
  heroSection{
    badge,
    heading,
    description,
    ctaButtons[]{
      text,
      link,
      isPrimary
    }
  },
  bannerSlider{
    images[]{
      image{
        asset->{
          _id,
          url
        }
      },
      alt,
      title
    },
    autoSlideInterval
  },
  stats[]{
    number,
    label
  },
  aboutSection{
    badge,
    heading,
    description,
    factoryImage{
      asset->{
        _id,
        url
      }
    },
    features[]{
      icon,
      title,
      color
    }
  },
  productsSection{
    badge,
    heading,
    description,
    featuredProducts[]{
      title,
      description,
      image{
        asset->{
          _id,
          url
        }
      },
      accent
    }
  },
  seo{
    metaTitle,
    metaDescription,
    ogImage{
      asset->{
        _id,
        url
      }
    }
  }
}`;

// Product queries - FIXED: Added missing comma after mainImage
export const productsListQuery = `*[_type == "product"] | order(featured desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  price,
  compareAtPrice,
  "mainImage": images[0]{
    image{
      asset->{
        _id,
        _ref,
        _type,
        url
      }
    },
    alt,
    caption
  },
  category,
  tags,
  featured,
  inStock,
  _createdAt,
  _updatedAt
}`;

// Fixed GROQ query for single product
export const singleProductQuery = `
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    titleUrdu,
    slug,
    description,
    descriptionUrdu,
    detailedDescription,
    detailedDescriptionUrdu,
    price,
    compareAtPrice,
    "mainImage": images[0]{
      image{
        asset->{
          _id,
          _ref,
          _type,
          url
        }
      },
      alt,
      caption
    },
    "gallery": images[1..-1]{
      image{
        asset->{
          _id,
          _ref,
          _type,
          url
        }
      },
      alt,
      
    },
    category,
    
    
    inStock,
    specifications[]{
      name,
      nameUrdu,
      value,
      valueUrdu
    },
    features[]{
      text,
      textUrdu
    },
    applications,
    videoUrl,
    seo,
    _createdAt,
    _updatedAt
  }
`;

export const allProductsQuery = `
  *[_type == "product"] | order(featured desc, _createdAt desc){
    _id,
    title,
    slug,
    description,
    price,
    compareAtPrice,
    "mainImage": images[0]{
      image{
        asset->{
          _id,
          _ref,
          _type,
          url
        }
      },
      alt,
      caption
    },
    category,
    tags,
    featured,
    inStock
  }
`;

export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(featured desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  price,
  "mainImage": images[0]{
    image{
      asset->{
        _id,
        url
      }
    },
    alt
  },
  category,
  featured,
  inStock
}`;

export const featuredProductsQuery = `
  *[_type == "product" && featured == true] | order(_createdAt desc)[0...6]{
    _id,
    title,
    slug,
    description,
    price,
    "mainImage": images[0]{
      image{
        asset->{
          _id,
          _ref,
          _type,
          url
        }
      },
      alt,
      caption
    },
    category,
    featured
  }
`;

// Search products query
export const searchProductsQuery = `*[_type == "product" && (
  title match $searchTerm + "*" ||
  description match $searchTerm + "*" ||
  category match $searchTerm + "*" ||
  $searchTerm in tags[]
)] | order(featured desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  price,
  "mainImage": images[0]{
    image{
      asset->{
        _id,
        url
      }
    },
    alt
  },
  category,
  featured,
  inStock
}`;

// Product categories query (for filters)
export const productCategoriesQuery = `*[_type == "product"]{
  category
} | order(category asc)`;

// Related products query
export const relatedProductsQuery = `*[_type == "product" && category == $category && _id != $currentId][0...3]{
  _id,
  title,
  slug,
  price,
  "mainImage": images[0]{
    image{
      asset->{
        _id,
        url
      }
    },
    alt
  },
  category,
  featured
}`;

// About page query
export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  title,
  heroSection{
    heading,
    description,
    backgroundImage{
      asset->{
        _id,
        url
      }
    }
  },
  companyHistory,
  mission,
  vision,
  values,
  team[]{
    name,
    position,
    bio,
    image{
      asset->{
        _id,
        url
      }
    }
  },
  certifications[]{
    name,
    description,
    image{
      asset->{
        _id,
        url
      }
    }
  }
}`;

// Contact page query
export const contactPageQuery = `*[_type == "contactPage"][0]{
  title,
  description,
  contactInfo{
    address,
    phone,
    email,
    workingHours
  },
  socialLinks{
    facebook,
    twitter,
    linkedin,
    instagram
  },
  mapLocation{
    lat,
    lng
  }
}`;