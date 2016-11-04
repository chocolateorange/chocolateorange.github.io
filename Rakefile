require 'fileutils'

# remove leading whitespace
# http://melborne.github.io/2012/04/27/ruby-heredoc-without-leading-whitespace/
class String
  def ~
    margin = scan(/^ +/).map(&:size).min
    gsub(/^ {#{margin}}/, '')
  end
end

task(:default).clear
task :default do
  system 'rake --silent --tasks'
end

desc 'install gems with Bundler'
task :install do
  sh 'bundle install --path vendor/bundle'
end

desc 'start jekyll server'
task :preview do
  sh 'bundle exec jekyll serve --drafts --watch'
end

desc 'publish draft posts'
task :publish do
  FileUtils.cp_r('_drafts/.', '_posts/.', {
    preserve: true,
  })
  FileUtils.rm_r(Dir.glob(['_drafts/*', '!_drafts/.gitkeep']), {
    secure: true,
  })
end

desc 'write a new post'
task :write do
  NOW_DATE = Time.now

  DIR_NAME = NOW_DATE.strftime('%Y/%m')
  FILE_PREFIX = NOW_DATE.strftime('%F')

  file = nil

  (1...100).each do |i|
    number = sprintf('%02d', i)

    next if [
      "_drafts/#{DIR_NAME}/#{FILE_PREFIX}-#{number}.md",
      "_posts/#{DIR_NAME}/#{FILE_PREFIX}-#{number}.md",
    ].any? {|f| File.exist?(f)}

    FILE_PATH = "_drafts/#{DIR_NAME}/#{FILE_PREFIX}-#{number}.md"

    FileUtils.mkdir_p(File.dirname(FILE_PATH), {
      mode: 0755,
    })

    open(file = FILE_PATH, 'w') do |f|
      f << ~<<-TEXT
      ---
      tags:
      title:
      ---
      TEXT
    end

    break
  end

  sh "$EDITOR #{file}" if not file.nil?
end
