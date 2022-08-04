const parseData = list => {
  const {Marker, Contents, NextMarker} = list;

  const paging = {
    cursors: {}
  }

  if (NextMarker)
    paging.cursors.before = NextMarker;
  if (Marker)
    paging.cursors.after = Marker;


  const data = Contents.map(e => {
    const parsed = {
      name: e.Key,
      url: `https://s3.us-south.cloud-object-storage.appdomain.cloud/davidsdevel-storage-cos-standard-y2b/${e.Key}`,
      thumbnail: `https://s3.us-south.cloud-object-storage.appdomain.cloud/davidsdevel-storage-cos-standard-y2b/x75-${e.Key}`
    }

    return parsed;
  });

  return {
    data,
    paging
  };
}


module.exports = parseData;
