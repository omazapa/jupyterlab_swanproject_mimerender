import { IRenderMime } from '@jupyterlab/rendermime-interfaces';



import { Widget } from '@lumino/widgets';

/**
 * The default mime type for the extension.
 */
const MIME_TYPE = 'text/directory';

/**
 * The class name added to the extension.
 */
const CLASS_NAME = 'mimerenderer-project';

/**
 * A widget for rendering  .
 */
export class OutputWidget extends Widget implements IRenderMime.IRenderer {
  /**
   * Construct a new output widget.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this._mimeType = options.mimeType;
    this.addClass(CLASS_NAME);
  }

  /**
   * Render   into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    
    let data = model.data[this._mimeType] as string;
    this.node.textContent = data.slice(0, 16384);
    
    return Promise.resolve();
  }

  private _mimeType: string;
}

/**
 * A mime renderer factory for   data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new OutputWidget(options)
};

/**
 * Extension definition.
 */
const extension: IRenderMime.IExtension = {
  id: 'jupyterlab_swanproject_mimerender:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'string',
  fileTypes: [
    {
      name: 'project',
      mimeTypes: [MIME_TYPE]
      //extensions: [' ']
    }
  ],
  documentWidgetFactoryOptions: {
    name: 'launcher',
    primaryFileType: 'project'
    //fileTypes: [' '],
    //defaultFor: [' ']
  }
};

export default extension;
