import { mergeAttributes } from "@tiptap/core";
import TiptapLink from "@tiptap/extension-link";
import { Plugin } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";

export const LinkExtension = TiptapLink.extend({
  inclusive: false,

  parseHTML() {
    return [
      {
        tag: 'a[href]:not([data-type="button"]):not([href *= "javascript:" i])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: "link",
      }),
      0,
    ];
  },

  addProseMirrorPlugins() {
    const { editor } = this;

    return [
      ...(this.parent?.() || []),
      new Plugin({
        props: {
          handlePaste: (view: EditorView, event: ClipboardEvent) => {
            const clipboardData = event.clipboardData;
            const pastedUrl = clipboardData?.getData("text/plain");

            if (
              pastedUrl &&
              (pastedUrl.includes("fileName=") ||
                pastedUrl.includes("folderName="))
            ) {
              event.preventDefault();

              // Extract the fileName query string value from the URL
              const url = new URL(pastedUrl);
              const fileName = url.searchParams.get("fileName");
              const folderName = url.searchParams.get("folderName");

              let displayText = pastedUrl;

              if (fileName) {
                displayText = "📄 " + fileName;
              } else if (folderName) {
                displayText = "📁 " + folderName;
              }

              // Insert the link as a file name text
              editor
                .chain()
                .focus()
                // .extendMarkRange("link")
                .setLink({ href: pastedUrl })
                .command(({ tr }) => {
                  tr.insertText(displayText);
                  return true;
                })
                .run();

              return true;
            }

            if (window.parent) {
              window.parent.postMessage({ type: "pasted" }, "*");
            }

            return false;
          },

          handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
            const { selection } = editor.state;

            if (event.key === "Escape" && selection.empty !== true) {
              editor.commands.focus(selection.to, { scrollIntoView: false });
            }

            return false;
          },
        },
      }),
    ];
  },
});
