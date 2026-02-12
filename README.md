# RealtyOS

A modern, production-ready Real Estate SaaS platform built for Canadian Realtors.

## Features

- **Authentication System** - Secure login/signup with Supabase
- **Lead Management System** - Full CRUD operations with status tracking
- **AI Listing Description Generator** - Generate compelling property descriptions
- **Modern UI** - Built with Tailwind CSS, shadcn/ui components
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Canadian Real Estate Focus** - Built specifically for Canadian market

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui components
- Supabase (Authentication & Database)
- React Router
- Lucide Icons

## Color Palette

- **Primary**: #2563eb (Blue)
- **Accent**: #10b981 (Green)
- **Background**: #ffffff / #f9fafb
- **Text**: #111827 / #6b7280

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Database Setup (Supabase)

Run the following SQL in your Supabase SQL editor:

```sql
-- Users table extension
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  brokerage TEXT,
  license_number TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'closed', 'lost')),
  source TEXT,
  notes TEXT,
  user_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Listing descriptions table
CREATE TABLE listing_descriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_type TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms DECIMAL,
  sqft INTEGER,
  location TEXT NOT NULL,
  features TEXT[],
  description TEXT NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## License

MIT
