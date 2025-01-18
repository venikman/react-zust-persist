
{ pkgs }: {
  deps = [
    pkgs.nodejs_23
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
  ];
}
