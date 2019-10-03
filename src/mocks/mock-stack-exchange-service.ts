import { searchTags } from './responses/searchTags';

export default class MockStackExchangeService {
  public searchTags() {
    return Promise.resolve(searchTags);
  }
}
