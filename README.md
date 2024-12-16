# Tractian chalenge

This project renders a asset tree, consulting the [Tractian Api](fake-api.tractian.com) 

The implemneted features are:
- A visual Tree representation of the company's asset hierarchy.
- **Sub-Features:**
    1. **Visualization**
        - Present a dynamic tree structure displaying components, assets, and locations.
    2. **Filters**
        
        **Text Search**
        
        - Users can search for specific components/assets/locations within the asset hierarchy.
        
        **Energy Sensors**
        
        - Implement a filter to isolate energy sensors within the tree.
        
        **Critical Sensor Status**
        
        - Integrate a filter to identify assets with critical sensor status.
      
    3. **Component Vizualization**

  To be implemented:
    1. **Collapse and Expand All Nodes**  
       - Allow users to collapse or expand all child nodes at once.
    
    2. **Improved Tree Pagination**  
       - Currently, to prevent lag when rendering large datasets, a pagination system has been
         implemented for tree rendering. A future improvement would be to render the entire tree seamlessly without requiring user interaction, while maintaining optimal performance.

        
