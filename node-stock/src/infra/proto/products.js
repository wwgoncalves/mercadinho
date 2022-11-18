const path = require("path");
const protobuf = require("protobufjs");
const protoLoader = require("@grpc/proto-loader");

const protoFile = path.resolve(__dirname, "../../../../proto/products.proto");

const protoPkgDefinition = protoLoader.loadSync(protoFile);
const ProtoProduct = protobuf.loadSync(protoFile).lookupType("Product");

module.exports = { protoPkgDefinition, ProtoProduct };
