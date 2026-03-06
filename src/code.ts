figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'analyze-design') {
    const selection = figma.currentPage.selection[0];
    
    if (!selection || selection.type !== "FRAME") {
      figma.notify("Please select a Frame to analyze");
      return;
    }

    // Extracting data for the AI Gem
    const designData = {
      name: selection.name,
      width: selection.width,
      height: selection.height,
      backgroundColor: selection.fills,
      textElements: selection.findAll(n => n.type === "TEXT").map((t: TextNode) => ({
        content: t.characters,
        fontSize: t.fontSize,
        fontName: t.fontName
      })),
      childrenCount: selection.children.length
    };

    // Send this data to the UI to be forwarded to your Custom Gem
    figma.ui.postMessage({ type: 'design-data-ready', data: designData });
  }
};
