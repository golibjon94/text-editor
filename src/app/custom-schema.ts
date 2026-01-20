import { Schema } from 'prosemirror-model';
import { schema as baseSchema } from 'ngx-editor/schema';

const schema = new Schema({
  nodes: baseSchema.spec.nodes,
  marks: baseSchema.spec.marks.append({
    font_size: {
      attrs: { size: { default: '12pt' } },
      parseDOM: [{
        style: 'font-size',
        getAttrs: (value) => ({ size: value })
      }],
      toDOM: (mark) => ['span', { style: `font-size: ${mark.attrs['size']}` }, 0]
    },
    font_family: {
      attrs: { family: { default: 'Arial' } },
      parseDOM: [{
        style: 'font-family',
        getAttrs: (value) => ({ family: (value as string).replace(/['"]/g, '') })
      }],
      toDOM: (mark) => ['span', { style: `font-family: ${mark.attrs['family']}` }, 0]
    }
  })
});

export default schema;
