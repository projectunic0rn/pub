import { searchTags } from './responses/searchTags';

export default class MockStackExchangeService {
  public async searchTags() {
    return searchTags;
  }
}
