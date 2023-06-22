const BaseController = require('./base.controller');
const PropertyRepository = require('../repository/property.repository');
const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

class PropertyController extends BaseController {
  constructor() {
    const propertyRepository = new PropertyRepository();
    super(propertyRepository);
    this.repo = propertyRepository;
  }

  async add(req, res) {
    try {
      await upload.fields([
        { name: 'photos', maxCount: 1 },
        { name: 'maps', maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          // Handle Multer error
          return res.status(400).json({ error: 'Failed to upload file' });
        }
  
        // Extract other property data from the request body
        const {
          property_name,
          property_type,
          location,
          description,
          bedrooms,
          bathrooms,
          cost,
        } = req.body;
  
        // Get the uploaded file paths
        const propertyImagePath = req.files['photos']?.[0]?.filename;
        const mapsImagePath = req.files['maps']?.[0]?.filename;
  
        // Create a new property instance
        const propertyData = {
          property_name,
          property_type,
          location,
          description,
          bedrooms,
          bathrooms,
          cost,
          photos: propertyImagePath || '',
          maps: {
            filename: mapsImagePath || '',
            url: mapsImagePath ? `http://localhost:5000/uploads/${mapsImagePath}` : '',
          },
        };
  
        // Save the property to MongoDB
        const doc = await this.repo.create(propertyData);
        res.status(201).send(`
  <script>
    alert('Property saved successfully');
    window.location.href = '/api/property/register';
  </script>
`);
      });
    } catch (err) {
      this.sendErrorResponse(res, 'Failed to add property');
    }
  }
  

  // Implement other controller methods as needed
}

module.exports = PropertyController;
