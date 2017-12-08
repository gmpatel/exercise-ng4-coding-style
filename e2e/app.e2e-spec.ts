import { AglCodingExePage } from './app.po';

describe('agl-coding-exe App', () => {
  let page: AglCodingExePage;

  beforeEach(() => {
    page = new AglCodingExePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
