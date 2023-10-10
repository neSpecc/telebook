# Thumbnail generator

Tool for generating thumbnails for images in /public/pics

Generates JSON with the following format:

```
{
  "thumbs": {
    "hotel-1.jpg": "Base64 of 10x10 thumb"
  },
  ...
}
```

Saves the JSON to `/src/infra/store/thumbs/thumbs.json`

Then it will be used by the app to display thumbnails in the gallery, see `application/services/useThumbnail.ts`

## Usage

```
node tools/thumbs.js
```
