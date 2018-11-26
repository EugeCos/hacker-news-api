import parseDomain from "parse-domain";

export const parseUrl = url => {
  let domain = parseDomain(url);
  return `${domain.domain}.${domain.tld}`;
};
