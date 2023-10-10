import { imageToBase64 } from '@/infra/utils/dom'
import { type Ref, onMounted, ref } from 'vue'
import ImageCache from '@/infra/store/thumbs/image.cache'

interface useThumbnailComposableState {
  /**
   * Loading state of the picture.
   */
  isPictureLoaded: Ref<boolean>;

  /**
   * Picture data in base64.
   */
  pictureUrl: Ref<string>;
}

/**
 * Application service to return picture data:
 *  - thumbnail when picture is not loaded yet,
 *  - picture when picture is loaded.
 *
 * @param src picture url
 * @param thumbData thumbnail data in base64
 */
export default function useThumbnail(src: string, thumbData: string): useThumbnailComposableState {
  /**
   * Get cached data if exists.
   */
  const cachedData = ImageCache.get(src)

  if (cachedData !== undefined) {
    return {
      pictureUrl: ref(cachedData),
      isPictureLoaded: ref(true),
    }
  }

  /**
   * Loading state of the picture.
   */
  const isPictureLoaded = ref(false)

  /**
   * Picture data in base64.
   */
  const data = ref(`data:image/png;base64,${thumbData}`)

  onMounted(() => {
    void imageToBase64(src)
      .then(base64 => {
        data.value = base64
        isPictureLoaded.value = true

        ImageCache.set(src, base64)
      })
  })

  return {
    pictureUrl: data,
    isPictureLoaded,
  }
}
