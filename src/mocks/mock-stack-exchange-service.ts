import { searchTags } from './responses/search-tags';

export default class MockStackExchangeService {
  public async searchTags() {
    return searchTags;
  }
}
