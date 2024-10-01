import variant from "@/app/_lib/variants/variant-color";

export const variantAlertError = {
  'error-solid': variant['solid-error'],
  'error-soft': variant['soft-error'],
  'error-outline': variant['outline-error'],
};
export const variantAlertSuccess = {
  'success-solid': variant['solid-success'],
  'success-soft': variant['soft-success'],
  'success-outline': variant['outline-success'],
};
export const variantAlertWarning = {
  'warning-solid': variant['solid-warning'],
  'warning-soft': variant['soft-warning'],
  'warning-ouline': variant['outline-warning'],
};

const variantsAlert = {
  variant: {
    ...variantAlertSuccess,
    ...variantAlertWarning,
    ...variantAlertError,
    notification: {
      ...variant,
    },
    info: {
      ...variant,
    },
  },
  position: {
    'top-left': 'top-6 left-6',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-6 right-6',
  },
  isFixed: {
    true: 'fixed z-[99] ',
    false: 'static  ',
  },
};

export default variantsAlert;
