import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import RecentArticle from "../components/RecentArticle";
import ArticleCard from "../components/ArticleCard";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { fetchBlogs } from "../services/blogService";

const logo = "/Nav/Logo.PNG";
const fallbackImage =
  "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=900&fit=crop";
const INSIGHTS_PER_PAGE = 6;

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      try {
        setIsLoading(true);
        setError("");
        const data = await fetchBlogs();

        if (!isMounted) {
          return;
        }

        setBlogs(data);
        setSelectedBlogId(data[0]?.id || "");
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || "Failed to load blogs");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIsExpanded(false);
    setCurrentPage(1);
  }, [selectedBlogId]);

  const featuredBlog = useMemo(() => {
    if (!blogs.length) {
      return null;
    }

    return blogs.find((blog) => blog.id === selectedBlogId) || blogs[0];
  }, [blogs, selectedBlogId]);

  const recentBlogs = useMemo(
    () => blogs.filter((blog) => blog.id !== featuredBlog?.id).slice(0, 4),
    [blogs, featuredBlog]
  );

  const insightBlogs = useMemo(
    () => blogs.filter((blog) => blog.id !== featuredBlog?.id),
    [blogs, featuredBlog]
  );

  const totalInsightPages = Math.max(1, Math.ceil(insightBlogs.length / INSIGHTS_PER_PAGE));

  const paginatedInsightBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * INSIGHTS_PER_PAGE;
    return insightBlogs.slice(startIndex, startIndex + INSIGHTS_PER_PAGE);
  }, [currentPage, insightBlogs]);

  useEffect(() => {
    if (currentPage > totalInsightPages) {
      setCurrentPage(totalInsightPages);
    }
  }, [currentPage, totalInsightPages]);

  const selectBlog = (id) => {
    setSelectedBlogId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-gray-50 px-4 py-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-sm">
              Loading blog posts...
            </div>
          ) : !featuredBlog ? (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-sm">
              No blog posts available yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">{featuredBlog.title}</h1>

                <p className="mb-8 text-lg leading-relaxed text-gray-600 overflow-hidden">{featuredBlog.excerpt}</p>

                {isExpanded ? (
                  <div
                    className="blog-content mb-8 max-w-none"
                    dangerouslySetInnerHTML={{ __html: featuredBlog.content }}
                  />
                ) : null}

                <div className="mb-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="mindployenglish" className=" border-2 border-[#F5C6D8] rounded-xl h-15 w-auto" />
                    <div>
                      <p className="font-semibold text-gray-900">{featuredBlog.authorName}</p>
                      <p className="text-sm text-gray-600">{featuredBlog.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded((current) => !current)}
                    className="flex items-center gap-2 rounded-full bg-[#F8B2C0] px-8 py-3 font-semibold text-gray-900 transition-colors hover:bg-[#F8C2C0]"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                    <span>{isExpanded ? "↑" : "↓"}</span>
                  </button>
                </div>

                <div className="mt-8">
                  <img
                    src={featuredBlog.image || fallbackImage}
                    alt={featuredBlog.title}
                    className="h-120 w-full rounded-2xl object-cover"
                  />
                </div>
              </div>

              <div className="mt-5 md:col-span-1">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Recents</h2>

                <div className="space-y-2">
                  {recentBlogs.map((blog) => (
                    <RecentArticle
                      key={blog.id}
                      title={blog.title}
                      description={blog.excerpt}
                      authorName={blog.authorName}
                      date={blog.date}
                      onReadMore={() => selectBlog(blog.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 px-4 py-12 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">English Learning Insights</h2>
            <div className="mx-auto h-2 w-52 bg-black" />
          </div>

          {insightBlogs.length ? (
            <div className="mb-8">
              <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
                {paginatedInsightBlogs.map((blog) => (
                  <ArticleCard
                    key={blog.id}
                    id={blog.id}
                    image={blog.image}
                    title={blog.title}
                    description={blog.excerpt}
                    authorName={blog.authorName}
                    date={blog.date}
                    onReadMore={selectBlog}
                  />
                ))}
              </div>

              {totalInsightPages > 1 ? (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    disabled={currentPage === 1}
                    className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalInsightPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                        currentPage === page
                          ? "bg-[#F8B2C0] text-gray-900"
                          : "border border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.min(page + 1, totalInsightPages))}
                    disabled={currentPage === totalInsightPages}
                    className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-2xl bg-white p-10 text-center text-gray-600 shadow-sm">
              More articles will appear here once blogs are published.
            </div>
          )}
        </div>
      </div>

      <ContactSection />
      <Footer />

      <style>{`
        .blog-content {
          color: #374151;
          font-size: 1rem;
          line-height: 1.75;
        }

        .blog-content > * + * {
          margin-top: 1rem;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          color: #111827;
          font-weight: 700;
          line-height: 1.25;
        }

        .blog-content h1 {
          font-size: 2rem;
        }

        .blog-content h2 {
          font-size: 1.75rem;
        }

        .blog-content h3 {
          font-size: 1.5rem;
        }

        .blog-content blockquote {
          margin: 1.5rem 0;
          border-left: 4px solid #f472b6;
          padding: 0.25rem 0 0.25rem 1rem;
          color: #6b7280;
          font-style: italic;
          background: #fdf2f8;
          border-radius: 0 0.75rem 0.75rem 0;
        }

        .blog-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .blog-content ul,
        .blog-content ol {
          padding-left: 1.5rem;
        }

        .blog-content ul {
          list-style: disc;
        }

        .blog-content ol {
          list-style: decimal;
        }
      `}</style>
    </div>
  );
}

export default Blog;
