````markdown
# Tax Quote Generator

A modern web application that analyzes tax returns and generates complexity-based quotes. The application processes Form 1040 tax returns directly in the browser, ensuring data privacy and security.

## Features

- **📄 Secure PDF Processing:**  Processes Form 1040 tax return PDFs directly within the browser using client-side execution. This eliminates the need to upload sensitive tax documents to external servers.
- **🔒 Privacy-Focused:**  Your tax data stays on your computer. No information leaves your browser during processing, ensuring complete data privacy and security.
- **📊 Intelligent Tax Return Complexity Analysis:**  Analyzes various aspects of a tax return to determine its complexity, going beyond simple page counting to provide a nuanced assessment.
- **💡 Smart Detection of Income Types and Tax Schedules:**  Intelligently identifies different income sources (W-2, 1099-NEC, 1099-DIV, 1099-INT) and tax schedules (Schedule B, C, D, E) within the Form 1040.
- **🎯 Instant Quote Generation:**  Provides an immediate quote based on the analyzed complexity of the tax return, helping tax professionals quickly assess and price their services.
- **🎨 Modern, Responsive UI with Real-time Processing Feedback:**  Features a clean, user-friendly interface that adapts to different screen sizes. Real-time progress indicators and feedback keep users informed during the analysis process.
- **Drag and Drop Functionality:**  Users can easily upload their tax return PDF by dragging and dropping the file directly into the application, in addition to using the file upload button.
- **Clear Complexity Categories:**  Categorizes tax return complexity into easily understandable levels (Basic, Intermediate, Advanced) based on a transparent scoring system.

## Technology Stack

- **Frontend Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) -  For building a dynamic and type-safe user interface.
- **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/) -  A powerful JavaScript library by Mozilla for parsing and rendering PDF documents directly in the browser.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) -  A utility-first CSS framework for rapid UI development and consistent styling.
- **Icons**: [Lucide React](https://lucide.dev/) -  A library of beautiful and consistent icons as React components.
- **Build Tool**: [Vite](https://vitejs.dev/) -  A fast and modern build tool for a streamlined development experience.

## Getting Started

Get started with the Tax Quote Generator by following these steps:

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/) (v14 or higher):** JavaScript runtime environment.
- **[npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager:**  Used to install project dependencies.

### Installation

1. **Clone the repository:**

   Open your terminal and clone the repository to your local machine using Git:

   ```bash
   git clone [https://github.com/geormdude/client_quote.git](https://github.com/geormdude/client_quote.git)
   cd client_quote
````

2. **Install dependencies:**

    Navigate into the cloned project directory (`client_quote`) and install the required npm packages:

    ```bash
    npm install
    # or if you prefer yarn:
    yarn install
    ```

### Running the Development Server

1. **Start the development server:**

    Once the dependencies are installed, start the development server with:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. **Access the application:**

    Open your web browser and go to the address displayed in your terminal (usually `http://localhost:5173`). The application should now be running, and you can start using the Tax Quote Generator.

## Usage

Using the Tax Quote Generator is straightforward:

1. **Upload Tax Return PDF:**

      - **Drag and Drop:** Drag your Form 1040 PDF file and drop it into the designated area on the application.
      - **Click to Upload:** Alternatively, click the "upload" button to open a file dialog and select your Form 1040 PDF file.

2. **Automatic Analysis:**

      - Once the PDF is uploaded, the application automatically begins analyzing the tax return.
      - No manual initiation of the analysis is required.

3. **Review Complexity Assessment and Quote:**

      - After the analysis is complete, the application will display:
          - A complexity assessment of the tax return (e.g., Basic, Intermediate, Advanced).
          - A generated quote based on the complexity.

4. **Real-time Processing Status:**

      - During the PDF processing and analysis, a progress indicator will be displayed in real-time.
      - This provides visual feedback on the application's current status and processing progress.

## Technical Details

### Tax Return Analysis

The application intelligently analyzes Form 1040 tax returns by evaluating the presence and complexity of various income sources, tax schedules, and deductions. The key components analyzed include:

- **Income Sources**

  - **W-2 Employment Income:**  Detects and analyzes W-2 forms for employment income.
  - **1099-NEC (Self-employment):** Identifies self-employment income reported on Form 1099-NEC.
  - **1099-DIV (Dividends):**  Analyzes dividend income from Form 1099-DIV.
  - **1099-INT (Interest):**  Detects and processes interest income from Form 1099-INT.

- **Tax Schedules**

  - **Schedule B (Interest and Dividends):**  Checks for the presence of Schedule B, indicating detailed interest or dividend income.
  - **Schedule C (Business Income):**  Detects Schedule C, signifying business income or loss from a sole proprietorship.
  - **Schedule D (Capital Gains):**  Analyzes Schedule D for capital gains and losses from investments.
  - **Schedule E (Rental Income):**  Identifies Schedule E, indicating income or loss from rental properties, royalties, partnerships, S corporations, estates, and trusts.

- **Deductions**

  - **Charitable Contributions:**  Evaluates the complexity related to charitable contribution deductions.
  - **Mortgage Interest:**  Analyzes deductions for mortgage interest expenses.
  - **Medical Expenses:**  Assesses the complexity associated with medical expense deductions.

### Complexity Scoring

The application employs a weighted scoring system to determine the overall complexity of a tax return:

- **Schedule Presence:**  Each detected tax schedule (Schedule B, C, D, E) adds a significant complexity weight:

  - **×2 multiplier per schedule**

- **Specific Income and Deduction Types:**

  - **Business income (Schedule C):**  +3 points
  - **Rental property (Schedule E):**  +2 points
  - **Investment Complexity Levels (Schedule D):**
    - **Complex Investments:**  +3 points (e.g., complex derivatives, options trading)
    - **Moderate Investments:**  +1 point (e.g., sales of stocks and bonds)
    - **Simple Investments:**  0 points (e.g., basic capital gains)

- **Final Complexity Categories:**

    The total complexity score is used to categorize the tax return into three levels:

  - **Basic:** (score ≤ 3) -  Represents simple tax returns, typically with only W-2 income and standard deductions.
  - **Intermediate:** (score 4-6) - Indicates moderately complex returns, potentially including itemized deductions, investment income, or self-employment income.
  - **Advanced:** (score \> 6) -  Signifies highly complex tax returns, often involving multiple schedules, business income, rental properties, and complex investments.

## Security and Privacy

Your privacy and data security are paramount. The Tax Quote Generator is designed with the following security and privacy principles in mind:

- **Client-Side Processing:** All tax return processing is performed directly within your web browser using [PDF.js](https://mozilla.github.io/pdf.js/). This ensures that no sensitive tax data is ever transmitted to external servers.
- **Data Privacy:**  No tax return data leaves your browser during the entire process. The application operates offline once loaded, and no information is sent over the internet.
- **In-Memory Processing:**  Tax return files are processed in-memory and are not stored persistently by the application. Once you close the browser window or refresh the page, all data is cleared from memory.
- **File Validation:**  The application includes built-in file validation to ensure that only valid Form 1040 PDF files are processed. This validation includes checks for file type and size to prevent malicious uploads.

## Project Structure

```
client_quote/
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx        # Component for handling file uploads (drag & drop and button)
│   │   ├── ProcessingStatus.tsx  # Component displaying real-time processing progress and feedback
│   │   ├── QuoteSummary.tsx      # Component to display the final complexity assessment and quote
│   ├── utils/
│   │   └── pdfProcessor.ts       # Utility module containing the core PDF analysis and processing logic
│   ├── types/
│   │   └── tax.ts            # TypeScript type definitions for tax-related data structures
│   ├── App.tsx                 # Main application component, orchestrating the UI and logic
│   └── main.tsx                # Entry point for the React application using Vite
├── public/
│   └── vite.svg                # Default Vite logo (can be replaced with project logo)
├── index.html                  # Main HTML entry file
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration file
├── vite.config.ts              # Vite build tool configuration
└── README.md                   # Project documentation (this file)
```

## Contributing

Contributions are welcome and encouraged\! Here's how you can contribute to the Tax Quote Generator:

1. **Fork the repository:**

      - Click the "Fork" button at the top right of the repository page on GitHub. This will create a copy of the repository in your GitHub account.

2. **Create your feature branch:**

      - Clone the forked repository to your local machine.
      - In your terminal, navigate to the cloned repository directory.
      - Create a new branch for your feature or bug fix:

        ```bash
        git checkout -b feature/AmazingFeature
        ```

        *(Replace `feature/AmazingFeature` with a descriptive name for your branch)*

3. **Commit your changes:**

      - Make your code changes and improvements.
      - Stage your changes using Git:

        ```bash
        git add .
        ```

      - Commit your changes with a clear and concise commit message:

        ```bash
        git commit -m 'Add some AmazingFeature'
        ```

4. **Push to the branch:**

      - Push your local branch to your forked repository on GitHub:

        ```bash
        git push origin feature/AmazingFeature
        ```

5. **Open a Pull Request:**

      - Go to the original repository on GitHub.
      - Click the "Compare & pull request" button that appears on GitHub.
      - Fill out the pull request form with a descriptive title and details about your changes.
      - Submit the pull request.

## License

This project is licensed under the [MIT License](LICENSE) - see the `LICENSE` file for details.

## Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) - For providing the core PDF processing capabilities in the browser.
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework that enables rapid and consistent styling.
- [Lucide](https://lucide.dev/) - For the beautiful and consistent icon set used throughout the application.
- [Vite](https://www.google.com/url?sa=E&source=gmail&q=https://vitejs.dev/) - For the fast and efficient build tool that makes development a breeze.
