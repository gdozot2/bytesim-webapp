/**
 * Displayed warning when user use specified feature
 * autoplay: https://www.nngroup.com/articles/video-usability/
 * loop: https://gr491.isit-europe.org/crit.php?id=3-4026-contenus-la-presentation-dun-service-est-rarement-contenue
 **/
export const videoWarnings = {
    autoplay: "Autoplay disturbs users and uses data even if the video is not watched.",
    loop: "Looping videos conduct to unnecessary consumption when users have already seen the video."
}

/**
 * Displayed tips when user use specified params that may be better
 * format: https://developer.mozilla.org/fr/docs/Web/Media/Formats/Image_types
 * quantity: https://www.nngroup.com/articles/designing-effective-carousels/
 */
export const imageTips = {
    format: "Have you considered the option of using a more optimal format such as WebP ?",
    quantity: "If it's a carousel, avoid putting more than 5 images as the last ones will probably not be seen."
}

export const dynContentTips = {
    dynamicMap: "Have you considered the option of using a simple image ? Avoiding interaction may reduce the data usage.",
    advertising: "You should avoid inserting ads deep in your page since the user will likely not see it and it will result in useless data consumption.",
    analytics: "Have you tried to keep the analysis to a minimum to limit the use of data and reduce the use of personal data ?"
}