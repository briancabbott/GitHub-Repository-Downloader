Pod::Spec.new do |s|
  s.name         = "Apollo-Starscream"
  s.module_name  = "Starscream"
  s.version      = "3.1.2"
  s.summary      = "This is a fork of Starscream 3 that has been modified by ApolloGraphQL. It is used as a dependency for the `Apollo` GraphQL client library. A conforming WebSocket RFC 6455 client library in Swift."
  s.homepage     = "https://github.com/apollographql/Starscream"
  s.license      = 'Apache License, Version 2.0'
  s.author       = { 'Anthony Miller' => 'AnthonyMDev@gmail.com', 'Dalton Cherry' => 'http://daltoniam.com', 'Austin Cherry' => 'http://austincherry.me'}
  s.source       = { :git => 'https://github.com/apollographql/Starscream.git',  :tag => "#{s.version}"}
  s.ios.deployment_target = '8.0'
  s.osx.deployment_target = '10.10'
  s.tvos.deployment_target = '9.0'
  s.watchos.deployment_target = '2.0'
  s.source_files = 'Sources/**/*.swift'
  s.swift_version = '5.0'
end
