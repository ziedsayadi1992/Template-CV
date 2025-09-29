# French CV Template with Export Functionality

A modern, professional  CV template built with React, TypeScript, and Tailwind CSS. This application allows you to create, customize, and export a beautiful CV in PDF format.

## Features

- 🎨 **Modern Design**: Clean, professional layout with beautiful typography
- 📱 **Responsive**: Optimized for both screen viewing and printing
- 📄 **PDF Export**: High-quality PDF generation with proper pagination
- 🌐 **French Language**: Specifically designed for French CVs with proper sections
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🎯 **TypeScript**: Full type safety for better development experience
- 🎨 **Tailwind CSS**: Utility-first CSS framework for easy customization

## CV Sections

The template includes all standard French CV sections:

- **Header**: Personal information with contact details
- **Profil Professionnel**: Professional summary/profile
- **Domaines de Compétences**: Skills and competencies
- **Environnements Techniques**: Technical skills and technologies
- **Expériences Professionnelles**: Professional experience with detailed missions
- **Langues**: Languages with proficiency levels
- **Certifications**: Professional certifications and training

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful icons
- **React-to-Print**: PDF export functionality

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## Installation

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   cd french-cv-template
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Customizing Your CV

### 1. Update Personal Information

Edit the file `src/data/cvData.ts` to customize your CV content:

```typescript
export const CV_DATA: CVData = {
  personalInfo: {
    fullName: "Your Name",
    professionalTitle: "Your Title",
    avatarUrl: "your-photo-url"
  },
  // ... other sections
};
```

### 2. Modify Sections

You can add, remove, or modify any section by updating the `cvData.ts` file. The application supports:

- **Skills**: Array of competency descriptions
- **Technologies**: Array of technical skills
- **Experiences**: Array of professional experiences with missions
- **Languages**: Array of languages with proficiency levels
- **Certifications**: Array of certifications and training

### 3. Styling Customization

The application uses Tailwind CSS. You can customize the styling by:

- Modifying classes in the components
- Updating the `tailwind.config.js` file
- Adding custom CSS in `src/index.css`

## Exporting Your CV

1. **PDF Export**: Click the "PDF" button in the top-right corner to download your CV as a PDF file
2. **Print**: The CV is optimized for A4 printing with proper page breaks and pagination

## Project Structure

```
src/
├── components/
│   ├── CVTemplate.tsx          # Main CV template component
│   └── PrintableCVContent.tsx  # Printable CV content
├── data/
│   └── cvData.ts              # CV data configuration
├── types/
│   └── cv.ts                  # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles
```

## Key Components

- **CVTemplate**: Main component that handles the layout and export functionality
- **PrintableCVContent**: Component optimized for printing and PDF generation
- **CV_DATA**: Configuration object containing all CV information

## Customization Tips

1. **Photo**: Replace the `avatarUrl` with your professional photo URL
2. **Colors**: The primary color is `#4590e6` (blue). You can change it throughout the components
3. **Fonts**: The application uses system fonts. You can add custom fonts via Tailwind CSS
4. **Layout**: Modify the component structure to change the CV layout
5. **Sections**: Add or remove sections by updating the data structure and components

## Browser Compatibility

This application works in all modern browsers:
- Chrome (recommended for PDF export)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:

1. Check the browser console for error messages
2. Ensure all dependencies are properly installed
3. Verify that you're using a supported Node.js version
4. Check that your data in `cvData.ts` follows the correct TypeScript interfaces

## Future Enhancements

Potential improvements for future versions:

- Multiple CV templates
- Real-time editing interface
- Multiple language support
- Cloud storage integration
- Additional export formats (Word, etc.)

---

**Happy job hunting! 🚀**
