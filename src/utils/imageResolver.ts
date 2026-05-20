const images: { [key: string]: any } = {
  'begonia': require('../../assets/images/begonia.jpg'),
  'bambu': require('../../assets/images/bambu.jpg'),
  'dieffenbachia': require('../../assets/images/dieffenbachia.jpg'),
  'aglaonema': require('../../assets/images/aglaonema.jpg'),
  'lirio': require('../../assets/images/lirio.jpg'),
  'clorosis': require('../../assets/images/clorosis.jpg'),
  'susi': require('../../assets/images/susi.png'),
};

export const resolveImageSource = (image: any) => {
  if (!image) return null;
  if (typeof image === 'string') {
    if (image.startsWith('@asset/')) {
      const name = image.replace('@asset/', '');
      if (images[name]) {
        return images[name];
      }
    }
    return { uri: image };
  }
  return image; // require(...) or resolved module
};
