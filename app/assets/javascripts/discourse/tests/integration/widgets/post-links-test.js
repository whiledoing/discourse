import {
  discourseModule,
  queryAll,
} from "discourse/tests/helpers/qunit-helpers";
import componentTest, {
  setupRenderingTest,
} from "discourse/tests/helpers/component-test";
import { click } from "@ember/test-helpers";

discourseModule("Integration | Component | Widget | post-links", function (
  hooks
) {
  setupRenderingTest(hooks);

  componentTest("duplicate links", {
    template: '{{mount-widget widget="post-links" args=args}}',
    beforeEach() {
      this.set("args", {
        id: 2,
        links: [
          {
            title: "Evil Trout Link",
            url: "http://eviltrout.com",
            reflection: true,
          },
          {
            title: "Evil Trout Link",
            url: "http://dupe.eviltrout.com",
            reflection: true,
          },
        ],
      });
    },
    test(assert) {
      assert.equal(
        queryAll(".post-links a.track-link").length,
        1,
        "it hides the dupe link"
      );
    },
  });

  componentTest("collapsed links", {
    template: '{{mount-widget widget="post-links" args=args}}',
    beforeEach() {
      this.set("args", {
        id: 1,
        links: [
          { title: "Link 1", url: "http://eviltrout.com?1", reflection: true },
          { title: "Link 2", url: "http://eviltrout.com?2", reflection: true },
          { title: "Link 3", url: "http://eviltrout.com?3", reflection: true },
          { title: "Link 4", url: "http://eviltrout.com?4", reflection: true },
          { title: "Link 5", url: "http://eviltrout.com?5", reflection: true },
          { title: "Link 6", url: "http://eviltrout.com?6", reflection: true },
          { title: "Link 7", url: "http://eviltrout.com?7", reflection: true },
        ],
      });
    },
    async test(assert) {
      assert.ok(queryAll(".expand-links").length === 1, "collapsed by default");
      await click("a.expand-links");
      assert.equal(queryAll(".post-links a.track-link").length, 7);
    },
  });
});
