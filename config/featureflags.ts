export const featureFlags = {
    enableAnimations: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS === 'true',
    enableBackgroundRemoval: process.env.NEXT_PUBLIC_ENABLE_BG_REMOVAL === 'true',
    enableImageToggle: process.env.NEXT_PUBLIC_ENABLE_IMAGE_TOGGLE === 'true',
  };