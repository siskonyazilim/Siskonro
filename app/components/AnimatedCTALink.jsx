// AnimatedCTALink -> AnimatedButton'ın takma adı (geriye dönük uyumluluk için)
// Bu dosya hem 'import AnimatedCTALink from ...' hem de 'import { AnimatedCTALink } from ...' sözdizimini destekler
import AnimatedButtonComponent from "./AnimatedButton";

// Named export - JSX'te <AnimatedCTALink> olarak kullanım için
export const AnimatedCTALink = AnimatedButtonComponent;

// Default export - 'import AnimatedCTALink from ...' için
export default AnimatedButtonComponent;
