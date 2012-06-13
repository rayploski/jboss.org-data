require File.join File.dirname(__FILE__), 'tweakruby'
require_relative 'common'
require_relative 'external'
require_relative 'remotePartial'
require_relative 'restclient_extensions_enabler'



Awestruct::Extensions::Pipeline.new do
  extension Awestruct::Extensions::RestClientExtensions::EnableGetCache.new
  extension Awestruct::Extensions::RestClientExtensions::EnableJsonConverter.new


  helper Awestruct::Extensions::RemotePartial
  helper Awestruct::Extensions::Partial
end

