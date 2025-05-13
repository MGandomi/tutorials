export class GalleryArchParser {
    parse(xmlDoc) {
       const imageField = xmlDoc.getAttribute("imageField")
       return {
           imageField,
       }
    }
}