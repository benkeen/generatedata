import * as React from 'react';
import { BuilderLayout } from '../../../components/builder/Builder.component';
import { GenerationTemplate } from '../../../../types/general';

type PreviewProps = {
    numPreviewRows: number;
    builderLayout: BuilderLayout;
    generationTemplate: GenerationTemplate;
}

const Preview = ({ numPreviewRows, builderLayout, generationTemplate }: PreviewProps) => {

    console.log(generationTemplate);

    return (
        <div>
            Preview!!!
        </div>
    );
};

export default Preview;
