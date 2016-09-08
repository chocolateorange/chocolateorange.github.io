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

desc 'write a new post'
task :write do
  NOW_DATE = Time.now

  DIR_NAME = "_drafts/#{NOW_DATE.strftime('%Y/%m')}"
  FILE_NAME = NOW_DATE.strftime('%F')

  FileUtils.mkdir_p(DIR_NAME, {
    mode: 0755,
  })

  markdown = nil

  (1...100).each do |i|
    file = "#{DIR_NAME}/#{FILE_NAME}-#{sprintf('%02d', i)}.md"

    next if File.exist?(file)

    open(markdown = file, 'w') do |file|
      file << ~<<-TEXT
      ---
      date:
      tags:
      title:
      ---
      TEXT
    end

    break
  end

  sh "$EDITOR #{markdown}" if not markdown.nil?
end
