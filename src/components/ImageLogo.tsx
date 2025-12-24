import {siteConfig} from "@/site";
import Image        from "next/image";

/**
 * LogoのImageを表示
 * @constructor
 */
export const ImageLogo = () => {
  return <Image
    width={192} height={192}
    src={`${siteConfig.basePath}/${siteConfig.assetDir}/icon-192x192.png`}
    alt="Logo" className="w-12 h-12"/>
}