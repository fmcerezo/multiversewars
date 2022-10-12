function getUuidPart() {
  return (((1+Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

const UuidHelper = {
  uuidLength: 19,

  getUuid: () => {
    return getUuidPart() + '-' + getUuidPart() + '-' + getUuidPart() + '-' + getUuidPart();
  }
};

export default UuidHelper;