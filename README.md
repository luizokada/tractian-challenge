# Tractian chalenge

This project renders a asset tree, consultint the [Tractian Api](fake-api.tractian.com) 

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
    - When the filters are applied, the asset parents **can't** be hidden. The user must know the entire asset path. The items that are not related to the asset path, must be hidden
    3. **Component Vizualization**
        
