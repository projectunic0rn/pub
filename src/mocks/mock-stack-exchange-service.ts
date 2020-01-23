import { searchTags } from './responses/search-tags';

export class MockStackExchangeService {
  public async searchTags() {
    return searchTags;
  }
}
