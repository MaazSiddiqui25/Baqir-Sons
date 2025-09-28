import { type SchemaTypeDefinition } from 'sanity'

// Import existing schemas
import homePage from './homePage'

// Import product-related schemas
import product from './productPage'


// Import additional content schemas


// Import reusable object schemas


// Collect all schemas here
export const schemaTypes: SchemaTypeDefinition[] = [
  // Main page schemas
  homePage,
  
  
  // Product & E-commerce schemas
  product,

  
  // Content schemas
 
  
  // Reusable object schemas
  
]

// Export schema object (this is what Sanity needs in config)
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}