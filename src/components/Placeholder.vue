<script setup lang="ts">
defineProps<{
  /**
   * Image URL. Will be displayed in the top-center of the placeholder.
   */
  image: string;

  /**
   * Title of the placeholder. Will be displayed in a large font below the picture.
   */
  title: string;

  /**
   * Caption of the placeholder. Will be displayed in a smaller font below the title.
   */
  caption: string;

  /**
   * Link text of CTA link
   */
  linkText: string;
}>()


</script>

<template>
  <div class="placeholder">

    <div class="pic">
      <img 
        :src="image" 
        aria-hidden="true"
      />
    </div>

    <h1 class="title">
      {{ title }}
    </h1>
  
    <p class="caption">
      {{ caption }}
    </p>

    <a 
      class="link"
      href="/"
    >
      {{ linkText }}
    </a>
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';

.placeholder {
  padding: 40px 28px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  place-items: center;

  @apply --body;

  .pic {
    width: 112px;
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 70%;
    }
  }

  .title {
    @apply --title-2-semibold;

    margin-top: var(--spacing-10);
  }

  .caption {
    margin-top: var(--spacing-8);
  }

  .link {
    display: block;
    margin: 0 auto;
    margin-top: var(--spacing-28);
    color: var(--color-link);
  }
}
</style>
