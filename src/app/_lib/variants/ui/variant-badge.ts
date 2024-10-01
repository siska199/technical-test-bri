import variant from "@/app/_lib/variants/variant-color";

const variantBadge = {
  ...variant,
  'softborder-black': 'bg-gray-100 text-gray-900 border-black/10 border',
  'softborder-gray': 'bg-gray-50  text-gray-700 border-gray-100 border',
  'softborder-primary': 'bg-primary-50 text-primary-700 border-primary-100 border',
  'softborder-success': 'bg-success-50 text-success-700 border-success-100 border',
  'softborder-warning': 'bg-warning-50 text-warning-700 border-warning-100 border',
  'softborder-error': 'bg-error-50 text-error-700 border-error-100 border',
  'softborder-white': 'bg-white-50 text-white-700 border-white border',
};


export type TVariantBadge = keyof typeof variantBadge;

export default variantBadge;
