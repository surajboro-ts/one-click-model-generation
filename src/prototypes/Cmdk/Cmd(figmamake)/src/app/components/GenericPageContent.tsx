import React from 'react';

interface GenericPageContentProps {
  title: string;
  category?: string;
}

export function GenericPageContent({ title, category }: GenericPageContentProps) {
  return (
    <div className="p-8 h-full overflow-y-auto bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#1d232f]">{title}</h2>
      </div>

      <div className="bg-[#f6f8fa] border border-[#d0d5dd] rounded-lg p-8 text-center h-[calc(100%-80px)] flex flex-col items-center justify-center">
        <div className="text-6xl mb-4">
          {title === 'Data objects' && '🗂️'}
          {title === 'Connections' && '🔗'}
          {title === 'Analyst Studio' && '📊'}
          {title === 'Utilities' && '🛠️'}
          {title === 'Sync' && '🔄'}
          
          {title === 'Reference questions' && '❓'}
          {title === 'Business terms' && '📚'}
          
          {title === 'Data catalog' && '📖'}
          {title === 'Usage' && '📈'}
          {title === 'dbt' && '🟧'}
          {title === 'Liveboard verification' && '✅'}

          {title === 'Home' && '🏠'}
          {title === 'Guide' && '📘'}
          {title === 'Playground' && '🎡'}
          
          {title === 'REST Playground v2.0' && '🔌'}
          {title === 'REST Playground v1' && '🔌'}
          {title === 'GraphQL v2.0' && '⚛️'}
          
          {title === 'Theme Builder' && '🎨'}
          {title === 'Custom actions' && '⚡'}
          {title === 'Styles' && '💅'}
          {title === 'Links settings' && '🔗'}
          {title === 'Security settings' && '🛡️'}
          {title === 'Webhooks' && '🪝'}
          
          {!['Data objects', 'Connections', 'Analyst Studio', 'Utilities', 'Sync', 'Reference questions', 'Business terms', 'Data catalog', 'Usage', 'dbt', 'Liveboard verification', 'Home', 'Guide', 'Playground', 'REST Playground v2.0', 'REST Playground v1', 'GraphQL v2.0', 'Theme Builder', 'Custom actions', 'Styles', 'Links settings', 'Security settings', 'Webhooks'].includes(title) && '📄'}
        </div>
        <h3 className="text-lg font-semibold text-[#1d232f] mb-2">{title}</h3>
        <p className="text-[#777e8b]">
          {category ? `${category} / ${title}` : title} content goes here.
        </p>
      </div>
    </div>
  );
}
