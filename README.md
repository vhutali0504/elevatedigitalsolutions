# Elevate Digital Solutions website

Marketing site for a freelance web development partnership in Johannesburg. React, Vite, Framer Motion and plain CSS, hosted on Netlify.

## Run it

    npm install
    npm run dev       # local development
    npm run build     # production build in dist/
    npm run preview   # serve the production build
    npm run lint

The contact form needs these in a root `.env` file locally, and in the Netlify environment settings for production:

    VITE_EMAILJS_SERVICE_ID
    VITE_EMAILJS_TEMPLATE_ID
    VITE_EMAILJS_PUBLIC_KEY

## Where things are

- `client/src/data/`: prices, FAQ, contact details and demo businesses. Most content edits happen here.
- `client/src/components/home/`: the home page sections.
- `client/src/components/MiniSite.jsx`: the small live website used in the hero and quote builder.
- `client/src/pages/`: legal pages, thank-you page and 404.
- `docs/DECISIONS.md`: why things are the way they are, and open items.
