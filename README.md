# UPI Pulse

A full-stack UPI transaction dashboard. Financial parsing, categorization, filtering, sorting, and summary calculations all run in the Express API.

## Run

```bash
npm run install:all
npm install
npm run dev
```

- Dashboard: http://localhost:5174
- API: http://localhost:4000/api

Use `npm test` for backend tests and `npm run build` for a production frontend build. The demo store is in memory, so category edits reset when the API restarts.
