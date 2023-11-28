import axios from 'axios';
import set from 'lodash/set';
import get from 'lodash/get';

/**
 * Update or add data at given path in custom data.
 * @param {string} path what should be updated, requires at least team.dataset.
 * @param {object} payload data payload that'll be saved on path.
 * @param {add|replace} method either add or replace.
 * @example:
 * apiSun.updateData('professors.example', {some: 'value'}) // merging with previous data
 * apiSun.updateData('professors.example', {different: 'value'}, 'replace') // rewriting data
 */
const updateData =
  (api) =>
  (path, payload, method = 'add') => {
    if (!path) {
      throw new Error('Error, path must be specified when calling updateData endpoint');
    }
    if (path.split('.').length < 2) {
      throw new Error('Error, path must have proper namespace in format "team.dataset".');
    }
    if (!method || !['replace', 'add'].includes(method)) {
      throw new Error('Update method is not specified. It muset be one of ["replace", "add"]');
    }
    return apiInstance.get('/rest/customdata').then((data) => {
      const [namespace, ...paths] = path.split('.');
      const destination = paths.join('');
      const index = data.findIndex(({ team }) => team === namespace);
      if (index === -1) {
        throw new Error(`${target} is not valid namepsace. Available namespaces ${data.map(({ team }) => team)}`);
      }
      const target = `[${index}].data.${destination}`;

      return api.post(
        '/rest/customdata',
        method === 'replace' ? set(data, target, payload) : set(data, `${target}[${[...(get(data, target) || [])].length}]`, payload)
      );
    });
  };

/**
 * Retrieve custom data for specific team.
 * @param {string} teamName team to read data from.
 */
const getCustomData =
  (api) =>
  (teamName = 'professors') => {
    return api.get(`/rest/customdata?q={'team': '${teamName}'}`);
  };

export const createInstance = (instance) => {
  const apiInstance = axios.create({
    baseURL: `https://${instance.base}.restdb.io`,
    headers: {
      'content-type': 'application/json',
      'x-apikey': instance.token,
      'cache-control': 'no-cache',
    },
  });

  apiInstance.interceptors.response.use((response) => response.data || response);

  return {
    apiInstance,
    get: (path) => apiInstance.get(path),
    post: (path, payload) => apiInstance.post(path, payload),
    updateData: updateData(apiInstance),
    getCustomData: getCustomData(apiInstance),
  };
};
