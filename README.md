# FinanceHub - Financial Dashboard Application

A comprehensive financial dashboard application built with React, TypeScript, and Tailwind CSS. Track transactions, visualize spending patterns, and gain insights into your financial activity.

##  Features

### Core Features

#### 1. Dashboard Overview
- **Summary Cards**: Display Total Balance, Total Income, and Total Expenses
- **Financial Trend Chart**: Line chart showing income, expenses, and net balance over time
- **Category Breakdown**: Pie chart visualizing spending distribution across categories
- **Animated UI**: Smooth entrance animations for all components

#### 2. Transactions Management
- **Complete Transaction List**: View all transactions with sortable columns
- **Advanced Filtering**: Filter by type, category, date range, and search text
- **CRUD Operations** (Admin only):
  - Add new transactions
  - Edit existing transactions
  - Delete transactions
- **Export Functionality**: Export transactions as CSV or JSON
- **Real-time Updates**: Instant UI updates with animated transitions

#### 3. Role-Based Access Control (RBAC)
- **Two Roles**:
  - **Admin**: Full access to add, edit, and delete transactions
  - **Viewer**: Read-only access to view data and insights
- **Role Switcher**: Easy toggle between roles in the header
- **Conditional UI**: Admin-only buttons and actions are hidden for viewers

#### 4. Insights & Analytics
- **Highest Spending Category**: Identify where most money is spent
- **Monthly Comparison**: Compare current month vs. previous month with percentage change
- **Category Breakdown**: Visual progress bars showing spending distribution
- **Key Observations**: Auto-generated insights based on spending patterns

#### 5. State Management
- **React Context API**: Centralized state management for:
  - Transactions data
  - User role
  - Theme preference
  - Filters and sorting
- **Local Storage Persistence**: All data persists across sessions
- **Optimized Performance**: Memoized calculations and filtering

### Additional Features

-  **Dark Mode**: Full dark mode support with theme toggle
-  **Data Persistence**: Local storage integration
-  **Responsive Design**: Works perfectly on mobile, tablet, and desktop
-  **Animations**: Smooth transitions using Motion (Framer Motion)
-  **Export Data**: Download transactions as CSV or JSON
-  **Empty States**: Graceful handling of no data scenarios
-  **Toast Notifications**: User feedback for all actions
-  **Mock Data**: Pre-populated with 6 months of realistic transactions







##  Project Structure

```
src/
├── app/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI component library (buttons, cards, etc.)
│   │   ├── BalanceTrendChart.tsx
│   │   ├── CategoryBreakdownChart.tsx
│   │   ├── Layout.tsx
│   │   ├── RoleSwitcher.tsx
│   │   ├── SummaryCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── TransactionFilters.tsx
│   │   ├── TransactionForm.tsx
│   │   └── TransactionList.tsx
│   ├── context/            # State management
│   │   └── AppContext.tsx
│   ├── data/               # Mock data
│   │   └── mockData.ts
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Insights.tsx
│   │   ├── NotFound.tsx
│   │   └── Transactions.tsx
│   ├── types/              # TypeScript types
│   │   └── index.ts
│   ├── utils/              # Utility functions
│   │   └── calculations.ts
│   ├── App.tsx             # Main app component
│   └── routes.tsx          # Route configuration
└── styles/                 # Global styles
    ├── fonts.css
    ├── index.css
    ├── tailwind.css
    └── theme.css
```

##  Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v7 (Data mode)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **UI Components**: Custom components built with Radix UI
- **State Management**: React Context API
- **Data Persistence**: Local Storage API

##  Key Implementation Details

### State Management
The application uses React Context API for global state management. The `AppContext` provides:
- Transaction CRUD operations
- Role management (Admin/Viewer)
- Theme toggling (Light/Dark)
- Filter management
- Export functionality
- Local storage synchronization

### Role-Based UI
RBAC is implemented purely on the frontend for demonstration:
- Role switcher in the header allows easy role switching
- Admin users see "Add Transaction" buttons and edit/delete actions
- Viewer users have a read-only experience
- All admin-only features are conditionally rendered based on the current role

### Data Calculations
Utility functions in `utils/calculations.ts` handle:
- Balance calculations (income - expenses)
- Category aggregations
- Monthly trend analysis
- Percentage changes
- Currency formatting

### Responsive Design
- Mobile-first approach
- Collapsible mobile navigation
- Responsive grid layouts
- Touch-friendly UI elements
- Optimized table displays for small screens

### Performance Optimizations
- Memoized filtered and sorted lists
- Lazy calculation of insights
- Efficient re-renders with proper React patterns
- Optimized chart rendering

##  Usage Guide

### Switching Roles
1. Use the role dropdown in the header
2. Select "Admin" for full access or "Viewer" for read-only

### Adding a Transaction (Admin only)
1. Navigate to the Transactions page
2. Click "Add Transaction" button
3. Fill in the form (date, amount, category, type, description)
4. Click "Add" to save

### Filtering Transactions
1. Use the filters section on the Transactions page
2. Filter by:
   - Search text (description/category)
   - Transaction type (income/expense)
   - Category
   - Date range
3. Click "Clear" to reset all filters

### Exporting Data
1. Navigate to the Transactions page
2. Click the "Export" dropdown
3. Choose CSV or JSON format
4. File will download automatically

### Viewing Insights
1. Navigate to the Insights page
2. View:
   - Highest spending category
   - Monthly comparison
   - Category breakdown with progress bars
   - Auto-generated key observations

### Toggling Dark Mode
1. Click the sun/moon icon in the header
2. Theme preference is saved automatically

## 🔍 Features Breakdown

### Dashboard Page
- Quick overview of financial health
- Three summary cards with key metrics
- Interactive line chart showing 6-month trend
- Pie chart breaking down expenses by category
- Smooth animations on page load

### Transactions Page
- Comprehensive transaction table
- Sortable columns (date, amount, category)
- Advanced filtering system
- Search functionality
- Export options
- Add/Edit/Delete (Admin only)
- Empty state handling

### Insights Page
- Spending analysis cards
- Monthly comparison with trend indicators
- Visual spending breakdown
- Intelligent observations
- Progress bars for category comparison

##  Design Decisions

1. **Tailwind CSS**: Chosen for rapid development and consistency
2. **Context API**: Lightweight state management suitable for this scale
3. **React Router Data Mode**: Modern routing with nested layouts
4. **Motion**: Smooth animations without performance overhead
5. **Recharts**: Simple yet powerful charting library
6. **Local Storage**: Client-side persistence without backend complexity
7. **TypeScript**: Type safety and better developer experience



##  Future Enhancements

Potential features for future versions:
- Budget tracking and alerts
- Recurring transactions
- Multiple accounts support
- Advanced analytics and predictions
- PDF report generation
- Backend integration with authentication
- Real-time collaboration
- Data import from bank statements

##  Notes

- All data is stored locally in the browser
- Mock data is generated for demonstration purposes
- The application is purely frontend with simulated RBAC
- No sensitive data should be stored in this demo version
- Dark mode preference is saved per device

##  Acknowledgments

Built with modern React best practices and attention to user experience. The application demonstrates proficiency in:
- Component architecture
- State management
- TypeScript
- Responsive design
- Data visualization
- Animation
- User experience design

---


