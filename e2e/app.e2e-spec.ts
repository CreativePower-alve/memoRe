import { MemoRePage } from './app.po';

describe('memo-re App', () => {
  let page: MemoRePage;

  beforeEach(() => {
    page = new MemoRePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
