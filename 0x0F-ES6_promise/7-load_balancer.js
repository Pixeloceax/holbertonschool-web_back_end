export default function loadBalancer(chinaDownload, USDownload) {
  return new Promise((resolve, reject) => {
    const china = chinaDownload;
    const us = USDownload;
    china.then((data) => {
      resolve(data);
    });
    us.then((data) => {
      resolve(data);
    });
    china.catch((err) => {
      reject(err);
    });
    us.catch((err) => {
      reject(err);
    });
  });
}
