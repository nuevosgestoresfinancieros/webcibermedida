import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { blogPosts } from '../mock';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="bg-slate-900 min-h-[60vh] flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center space-y-4">
          <h1 className="text-white text-3xl font-bold">Artículo no encontrado</h1>
          <p className="text-slate-400">El artículo que buscas no existe o ha sido movido.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold">
            <ArrowLeft size={15}/> Volver al blog
          </Link>
        </div>
      </section>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <PageHeader tag={post.category} title={post.title} subtitle={post.excerpt} />

      <section className="bg-slate-900 py-16">
        <div className="max-w-[800px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm">
              <ArrowLeft size={15}/> Volver al blog
            </Link>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
              <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-800 mb-8">
            <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" />
          </div>

          <article className="prose prose-invert max-w-none space-y-5 text-slate-300 leading-relaxed">
            {post.content.map((block, i) => {
              if (block.type === 'h2') return <h2 key={i} className="text-white text-2xl font-bold mt-8 mb-2">{block.text}</h2>;
              if (block.type === 'list') return (
                <ul key={i} className="space-y-2 list-disc list-inside text-slate-300">
                  {block.items.map((it, k) => <li key={k}>{it}</li>)}
                </ul>
              );
              return <p key={i}>{block.text}</p>;
            })}
          </article>

          <div className="mt-10 pt-6 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag size={14} className="text-slate-500"/>
              {post.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs rounded bg-slate-800 border border-slate-700 text-slate-300">{t}</span>
              ))}
            </div>
            <button onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-sm hover:border-cyan-500">
              <Share2 size={14}/> Compartir
            </button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-slate-950 py-16">
          <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
            <h2 className="text-white text-2xl font-bold mb-6">Artículos relacionados</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors">
                  <div className="aspect-[16/10] overflow-hidden"><img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/></div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-cyan-400">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
