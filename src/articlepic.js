import {
    Image,
} from '@aws-amplify/ui-react';


export const ArticlePic = ({ article }) => {
    return (article &&
        <Image
            key={article.id}
            src={article.imageUrl}
            alt={article.usage}
            title={article.usage}
            style={{ width: 125 }}
        />
    );

}
