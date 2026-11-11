# How to Add Photos to Luxtress Hair Studio

Adding new client hairstyles, nail sets, or salon photography takes just 4 steps:

1. **Resize the photo**:
   Resize the image to about 1600px on the long side for optimal web performance and crisp quality. Save it as `.jpg` or `.webp`.

2. **Drop the file into the project**:
   Save the image file into `/public/images/work/` (e.g. `/public/images/work/box-braids.jpg`).

3. **Add one entry in `src/data/photos.ts`**:
   Open `src/data/photos.ts` and add a new object to the `PHOTOS` array:
   ```ts
   {
     id: 'box-braids-ombre',
     src: '/images/work/box-braids.jpg',
     alt: 'Knotless box braids with subtle ombre highlights',
     services: ['braiding'],
     category: 'braids',
     featured: true,
   },
   ```
   - **`services`**: Array of service IDs to attach this photo to (e.g. `['haircuts']`, `['braiding']`, `['hairdressing']`, `['manicure']`, `['kids-hair']`).
   - **`category`**: One of `'braids'`, `'styling'`, `'men'`, `'kids'`, `'nails'`, `'salon'`.

4. **Save and refresh**:
   Save the file. The photo will automatically appear in its service detail panel and the Gallery filter grid.
